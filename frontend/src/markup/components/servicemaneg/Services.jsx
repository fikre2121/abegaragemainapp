import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

const initialServices = [
  {
    id: 1,
    title: "Oil change",
    description:
      "Every 3000 kilometers or so, you need to change the oil in your car to keep your engine in the best possible shape.",
  },
  {
    id: 2,
    title: "Spark Plug replacement",
    description:
      "Spark plugs wear out and can cause huge problems. Their job is to ignite the fuel in your engine.",
  },
  {
    id: 3,
    title: "Full Car inspection",
    description:
      'Look over all car systems to make sure only the "check engine" light is on or comes on.',
  },
  {
    id: 4,
    title: "Oxygen Sensor replacement",
    description:
      "Oxygen sensors monitor the environment in engine in the exhaust gases to make performance and emissions.",
  },
  {
    id: 5,
    title: "Brake work",
    description:
      "We all know why brake work is important, especially because one portion of all Canadian car accidents are caused by a failure to stop.",
  },
  {
    id: 6,
    title: "Tire repairs and changes",
    description:
      "Well, repaired flat tires you lose speed, control, and fuel efficiency. Ignore the need to get them patched if there's a leak.",
  },
  {
    id: 7,
    title: "The Ignition System",
    description:
      "A car's ignition system includes its starter, battery, and the ignition itself.",
  },
  {
    id: 8,
    title: "Programming the camera software",
    description:
      "Well, repaired flat tires you lose speed, control, and fuel efficiency. Ignore the need to get them patched if there's a leak.",
  },
];

const ServiceManage = () => {
  const [services, setServices] = useState(initialServices);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [nextId, setNextId] = useState(9);

  // --- Add ---
  const handleAdd = () => {
    if (!newTitle.trim() || !newDesc.trim()) return;
    setServices([
      ...services,
      { id: nextId, title: newTitle.trim(), description: newDesc.trim() },
    ]);
    setNextId(nextId + 1);
    setNewTitle("");
    setNewDesc("");
  };

  // --- Edit ---
  const startEdit = (service) => {
    setEditingId(service.id);
    setEditTitle(service.title);
    setEditDesc(service.description);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) return;
    setServices(
      services.map((s) =>
        s.id === editingId
          ? { ...s, title: editTitle.trim(), description: editDesc.trim() }
          : s,
      ),
    );
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  // --- Delete ---
  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <section className="services-section">
      <div className="auto-container">
        {/* TOP TITLE */}
        <div className="service-header">
          <div className="sec-title style-two">
            <h2>Our Services</h2>
            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution.
            </div>
          </div>
        </div>

        {/* SERVICES LIST */}
        <div className="services-box">
          {services.map((service) => (
            <div className="service-item" key={service.id}>
              {editingId === service.id ? (
                /* EDIT MODE */
                <div className="service-edit-form">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Service name"
                  />
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    placeholder="Service description"
                    rows="3"
                  />
                  <div className="edit-actions">
                    <button className="save-btn" onClick={saveEdit}>
                      <FiCheck /> Save
                    </button>
                    <button className="cancel-btn" onClick={cancelEdit}>
                      <FiX /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* VIEW MODE */
                <>
                  <div className="service-text">
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                  <div className="service-icons">
                    <FiEdit2
                      className="edit-icon"
                      onClick={() => startEdit(service)}
                    />
                    <FiTrash2
                      className="delete-icon"
                      onClick={() => handleDelete(service.id)}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* ADD NEW SERVICE */}
        <div className="add-service-box">
          <div className="title-row">
            <h3>Add a new service</h3>
            <span className="line"></span>
          </div>

          <div>
            <input
              type="text"
              placeholder="Service name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              placeholder="Service description"
              rows="6"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
            <button onClick={handleAdd}>ADD SERVICE</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceManage;
