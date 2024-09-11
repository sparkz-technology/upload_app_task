import { useState } from "react";

import FileUpload from "./components/FileUpload";
import Button from "./components/Button";
import Chip from "./components/Chip";

function App() {
  const [application, setApplication] = useState([
    {
      name: "Application 1",
      id: 1,
      document: [{ name: "Document 1", id: 1, file: null }],
    },
  ]);
  const [currentApplication, setCurrentApplication] = useState(1);
  const [currentDocument, setCurrentDocument] = useState(1);

  const handleAddApplication = () => {
    const newApp = {
      name: `Application ${application.length + 1}`,
      id: application.length + 1,
      document: [],
    };
    setApplication([...application, newApp]);
    setCurrentApplication(application.length + 1);
    setCurrentDocument(1);
  };

  const handleDeleteApplication = (event) => {
    const id = parseInt(event.target.name, 10);
    const updatedApplication = application.filter((app) => app.id !== id);
    setApplication(updatedApplication);

    if (currentApplication === id) {
      const newCurrentApplication =
        updatedApplication.length > 0 ? updatedApplication[0].id : null;
      setCurrentApplication(newCurrentApplication);
      setCurrentDocument(1);
    }
  };

  const handleAddDocForApplicant = () => {
    const newDoc = {
      name: `Document ${
        application[currentApplication - 1].document.length + 1
      }`,
      id: application[currentApplication - 1].document.length + 1,
      file: null,
    };
    const updatedApplication = application.map((app) => {
      if (app.id === currentApplication) {
        return {
          ...app,
          document: [...app.document, newDoc],
        };
      }
      return app;
    });
    setApplication(updatedApplication);
    setCurrentDocument(newDoc.id);
  };

  const handleDeleteDocument = (event) => {
    const docId = parseInt(event.target.name, 10);
    const updatedApplication = application.map((app) => {
      if (app.id === currentApplication) {
        return {
          ...app,
          document: app.document.filter((doc) => doc.id !== docId),
        };
      }
      return app;
    });
    setApplication(updatedApplication);

    if (currentDocument === docId) {
      const currentApp = updatedApplication.find(
        (app) => app.id === currentApplication
      );

      const newDocs = currentApp?.document ?? [];
      const newCurrentDocument = newDocs.length > 0 ? newDocs[0].id : null;

      setCurrentDocument(newCurrentDocument);
    }
  };

  const handleSelectApplication = (id) => {
    setCurrentApplication(id);
    const selectedApp = application.find((app) => app.id === id);
    const firstDocId =
      selectedApp.document.length > 0 ? selectedApp.document[0].id : null;
    setCurrentDocument(firstDocId);
  };

  const handleSelectDocument = (id) => {
    setCurrentDocument(id);
  };

  const handleFileUpload = (file) => {
    const updatedApplication = application.map((app) => {
      if (app.id === currentApplication) {
        return {
          ...app,
          document: app.document.map((doc) => {
            if (doc.id === currentDocument) {
              return { ...doc, file };
            }
            return doc;
          }),
        };
      }
      return app;
    });
    setApplication(updatedApplication);
  };

  const handlePrevious = () => {
    const currentApp = application.find((app) => app.id === currentApplication);
    const docIndex = currentApp.document.findIndex(
      (doc) => doc.id === currentDocument
    );

    // Move to the previous document if available
    if (docIndex > 0) {
      setCurrentDocument(currentApp.document[docIndex - 1].id);
    } else {
      // Move to the previous application if no more previous documents
      const previousAppId = currentApplication - 1;
      if (previousAppId > 0) {
        setCurrentApplication(previousAppId);
        const previousApp = application.find((app) => app.id === previousAppId);
        const lastDocId =
          previousApp.document.length > 0
            ? previousApp.document[previousApp.document.length - 1].id
            : null;
        setCurrentDocument(lastDocId);
      }
    }
  };

  const handleNext = () => {
    const currentApp = application.find((app) => app.id === currentApplication);
    const docIndex = currentApp.document.findIndex(
      (doc) => doc.id === currentDocument
    );

    // Move to the next document if available
    if (docIndex < currentApp.document.length - 1) {
      setCurrentDocument(currentApp.document[docIndex + 1].id);
    } else {
      // Move to the next application if no more documents
      const nextAppId = currentApplication + 1;
      if (nextAppId <= application.length) {
        setCurrentApplication(nextAppId);
        const nextApp = application.find((app) => app.id === nextAppId);
        const firstDocId =
          nextApp.document.length > 0 ? nextApp.document[0].id : null;
        setCurrentDocument(firstDocId);
      }
    }
  };

  const showFileUpload = () => {
    const app = application.find((app) => app.id === currentApplication);
    if (!app) return null;
    const doc = app.document.find((doc) => doc.id === currentDocument);
    if (!doc) return null;
    return (
      <FileUpload handleFileUpload={handleFileUpload} currentFile={doc.file} />
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center">
        Application and Document Management
      </h1>

      <div className="flex gap-2 my-4"></div>
      <div className="flex flex-wrap gap-2 my-2">
        {application.length > 0 &&
          application.map((app) => (
            <Chip
              key={app.id}
              isActivated={app.id == currentApplication}
              id={app.id}
              label={app.name}
              handleSelect={() => handleSelectApplication(app.id)}
              handleButtonClick={handleDeleteApplication}
            />
          ))}
        <Button label="Add Application" handleClick={handleAddApplication} />
      </div>
      {application.length > 0 && (
        <div className="flex justify-start">
          <div className="flex flex-col w-fit gap-2 my-4">
            {application[currentApplication - 1]?.document.map((doc) => (
              <Chip
                key={doc.id}
                label={doc.name}
                isActivated={doc.id === currentDocument}
                id={doc.id}
                handleSelect={() => handleSelectDocument(doc.id)}
                handleButtonClick={handleDeleteDocument}
              />
            ))}
            <Button
              label="Add Document"
              handleClick={handleAddDocForApplicant}
            />
          </div>
          <div className="mx-auto">{showFileUpload()}</div>
        </div>
      )}
      <div className="flex justify-between gap-4">
        <Button label="Previous" handleClick={handlePrevious} />
        <Button label="Next" handleClick={handleNext} />
      </div>
    </div>
  );
}

export default App;
