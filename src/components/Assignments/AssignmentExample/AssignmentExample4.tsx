import "./AssignmentExample.scss";
import "../../ThingLinkZoom/ThingLinkZoom.scss";

export default function AssignmentExample4() {
  return (
    <div className="assignment assignment-4">
      {requirements.map((requirement, index) => (
        <div key={`requirement-${index}`} className="grid">
          {requirement.map((item, index) => (
            <div key={index} className={`card ${item.label}`}>
              <header className="card-header">
                <p className="card-title">{item.title}</p>
                <p className="card-label">{item.label}</p>
              </header>
              <p className="card-description">{item.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const requirements = [
  [
    {
      title: "Must have",
      label: "Notice",
      description:
        "A pen tool which gives teachers the ability to annotate or draw on top of the page or text. The annotations should remain in position when zooming out or scrolling to another part of the page. (Teacher)",
    },
    {
      title: "Must have",
      label: "Notice",
      description:
        "Erasing tools which gives teachers the ability to remove specific parts of what has been created with the pen tool, or delete everything in one action. (Teacher)",
    },
    {
      title: "Must have",
      label: "Notice",
      description:
        "Saving the annotations during the current digiboard session so teachers can go back and forth between sliders during a lesson without losing their annotations. (Teacher)",
    },
  ],
  [
    {
      title: "Should have",
      label: "Query",
      description:
        "A marker tool which gives teachers the ability to mark specific parts of a text with a color. (Teacher)",
    },
    {
      title: "Should have",
      label: "Query",
      description:
        "Undo capabilities which give teachers the ability to quickly correct a mistake without being dependent on the erasing tools. (Teacher)",
    },
  ],
  [
    {
      title: "Could have",
      label: "Idea",
      description:
        "A tool to create shapes such as circles and squares which allows teachers to clarify specific words in a text. (Teacher)",
    },
    {
      title: "Could have",
      label: "Idea",
      description:
        "The ability to insert a text field so teachers can type in instructions or other long forms of test. (Teacher)",
    },
  ],
];
