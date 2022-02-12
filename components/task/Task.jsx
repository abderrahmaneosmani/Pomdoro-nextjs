import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Popconfirm, Form, Checkbox, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { CounterContext } from "../../contexts/CounterContext";
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {}
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

function Task() {
  const { dataSource, handleSetDataSource, handleDelete } =
    useContext(CounterContext);

  const [count, setCount] = useState(1);
  const [value, setValue] = useState("");
  const [selectionType] = useState(<Checkbox />);
  const [selectedTasks, setSelectedTasks] = useState(0);

  const columns = [
    {
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <DeleteOutlined />
            </Popconfirm>
          </>
        ) : null,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const tasks = [...dataSource];

      selectedRows.map((row) => {
        const index = tasks.indexOf(row);
        let rowSelected = tasks[index];
        return (rowSelected.selected = true);
      });

      handleSetDataSource(tasks);
      setSelectedTasks(selectedRows.length);
    },
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      name: value,
      selected: false,
    };
    let c = dataSource.filter((task) => task.key !== newData.key);

    handleSetDataSource([...dataSource, newData]);
    setCount(count + 1);

    setValue(" ");
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });

    handleSetDataSource(newData);
  };
  //handle input
  const handleInputTask = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  return (
    <div>
      <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24}>
          <Input
            value={value}
            onPressEnter={handleAdd}
            placeholder="Add task and hit Enter"
            onChange={handleInputTask}
          />

          <Table
            size="small"
            style={{ color: "black" }}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            showHeader={false}
            components={components}
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={columns}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Task;
