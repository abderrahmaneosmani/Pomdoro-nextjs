import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Space } from "antd";
import { FiMusic } from "react-icons/fi";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";

const useMultiAudio = (urls) => {
  const [sources] = useState(
    urls.map((url) => {
      return {
        url,
        audio: typeof Audio !== "undefined" ? new Audio(url) : undefined,
      };
    })
  );

  const [players, setPlayers] = useState(
    urls.map((url) => {
      return {
        url,
        playing: false,
      };
    })
  );

  const toggle = (targetIndex) => () => {
    const newPlayers = [...players];
    const currentIndex = players.findIndex((p) => p.playing === true);

    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false;
      newPlayers[targetIndex].playing = true;
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false;
    } else {
      newPlayers[targetIndex].playing = true;
    }
    setPlayers(newPlayers);
  };

  useEffect(() => {
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause();
    });
  }, [sources, players]);

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener("ended", () => {
        const newPlayers = [...players];
        newPlayers[i].playing = false;
        setPlayers(newPlayers);
      });
    });
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener("ended", () => {
          const newPlayers = [...players];
          newPlayers[i].playing = false;
          setPlayers(newPlayers);
        });
      });
    };
  }, []);

  return [players, toggle];
};

const Player = ({ toggle, label, player }) => (
  <Menu>
    <Menu.Item
      key={label}
      onClick={toggle}
      icon={player.playing ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
    >
      {label}
    </Menu.Item>
  </Menu>
);

function MusicItems({ urls, labels }) {
  const [players, toggle] = useMultiAudio(urls);

  const menus = players.map((player, i) => (
    <Player key={`${i}`} player={player} toggle={toggle(i)} label={labels[i]} />
  ));

  const menu = () => {
    return <Menu> {menus}</Menu>;
  };

  return (
    <Dropdown.Button
      style={{
        textColor: "white",
        backgroundColor: "white",
        letterSpacing: "5px",
        margin: "5px",
      }}
      overlay={menu}
      placement="bottomCenter"
      icon={<FiMusic />}
    >
      {" "}
      Music
    </Dropdown.Button>
  );
}

export default MusicItems;
