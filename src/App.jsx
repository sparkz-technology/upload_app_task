import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Button from "./components/Button";
import Chip from "./components/Chip";

function App() {
  const [application, setApplication] = useState([
    {
      name: "Application 1",
      id: crypto.randomUUID(),
      document: [{ name: "Document 1", id: crypto.randomUUID(), file: null }],
    },
  ]);
  const [currentApplication, setCurrentApplication] = useState(
    application[0].id
  );
  const [currentDocument, setCurrentDocument] = useState(
    application[0].document[0].id
  );

  const handleAddApplication = () => {
    const newApp = {
      name: `Application ${application.length + 1}`,
      id: crypto.randomUUID(),
      document: [],
    };
    setApplication([...application, newApp]);
    setCurrentApplication(newApp.id);
    setCurrentDocument(null);
  };

  const handleDeleteApplication = (event) => {
    const id = event.target.name;
    const updatedApplication = application.filter((app) => app.id !== id);
    setApplication(updatedApplication);

    if (currentApplication === id) {
      const newCurrentApplication =
        updatedApplication.length > 0 ? updatedApplication[0].id : null;
      setCurrentApplication(newCurrentApplication);
      setCurrentDocument(updatedApplication[0]?.document[0]?.id || null);
    }
  };

  const handleAddDocForApplicant = () => {
    const newDoc = {
      name: `Document ${
        application.find((app) => app.id === currentApplication)?.document
          .length + 1
      }`,
      id: crypto.randomUUID(),
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
    const docId = event.target.name;
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

    if (docIndex > 0) {
      setCurrentDocument(currentApp.document[docIndex - 1].id);
    } else {
      const previousAppIndex = application.findIndex(
        (app) => app.id === currentApplication
      );
      const previousApp = application[previousAppIndex - 1];
      if (previousApp) {
        setCurrentApplication(previousApp.id);
        setCurrentDocument(
          previousApp.document[previousApp.document.length - 1]?.id || null
        );
      }
    }
  };

  const handleNext = () => {
    const currentApp = application.find((app) => app.id === currentApplication);
    const docIndex = currentApp.document.findIndex(
      (doc) => doc.id === currentDocument
    );

    if (docIndex < currentApp.document.length - 1) {
      setCurrentDocument(currentApp.document[docIndex + 1].id);
    } else {
      const nextAppIndex = application.findIndex(
        (app) => app.id === currentApplication
      );
      const nextApp = application[nextAppIndex + 1];
      if (nextApp) {
        setCurrentApplication(nextApp.id);
        setCurrentDocument(nextApp.document[0]?.id || null);
      }
    }
  };

  const showFileUpload = () => {
    const app = application.find((app) => app.id === currentApplication);
    if (!app) return null;
    const doc = app.document.find((doc) => doc.id === currentDocument);
    if (!doc) return null;
    return (
      <FileUpload
        label={`Upload File for ${app.name} - ${doc.name}`}
        handleFileUpload={handleFileUpload}
        currentFile={doc.file}
      />
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
              isActivated={app.id === currentApplication}
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
            {application
              .find((app) => app.id === currentApplication)
              ?.document.map((doc) => (
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
