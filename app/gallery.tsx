"use client";

import { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import Modal from "./modal";

import { User } from "./types/user";

const Gallery = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);

    const response = await fetch(`https://randomuser.me/api/?results=10`);

    const data = await response.json();

    const transformedData = data.results.map((user: any, i: number) => {
      const name = user.name.first + " " + user.name.last;
      const address = {
        street: user.location.street.name,
        suite: user.location.street.number,
        city: user.location.city,
      };

      return { ...user, name, address };
    });

    setUsersList(transformedData);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchUsers();
    }

    return function cleanup() {
      mounted = false;

      setUsersList([]);
      setLoading(false);
    };
  }, []);

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="user-gallery">
      <h1 className="heading">Users</h1>
      <div className="items">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          usersList.map((user, index) => (
            <div
              className="item user-card"
              key={index}
              onClick={() => handleModalOpen(user.id)}
            >
              <div className="body">
                <Avatar
                  size={96}
                  name={user.name}
                  variant="marble"
                  colors={[
                    "#92A1C6",
                    "#146A7C",
                    "#F0AB3D",
                    "#C271B4",
                    "#C20D90",
                  ]}
                />
              </div>
              <div className="info">
                <div className="name">{user.name}</div>
                <div className="company">{user.email}</div>
              </div>
            </div>
          ))
        )}

        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">{selectedUser.name}</div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="fields">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
