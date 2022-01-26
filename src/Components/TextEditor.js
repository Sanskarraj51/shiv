import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TextEditor() {
  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const [isError, setError] = useState(null);

  const [userInfo, setuserInfo] = useState({
    title: "",
  });

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const addDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();
      if (userInfo.description.value.length < 10) {
        setError("Required, Add description Minimum length 50 characters");
        return;
      } else {
          console.log(userInfo.description.value)
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <form onSubmit={addDetails} className="update__forms">
            <h3 className="myaccount-content"> Add </h3>
            
            <div className="form-row">
              <div className="form-group col-md-12 editor">
                <label className="font-weight-bold">
                  {" "}
                  Description <span className="required"> * </span>{" "}
                </label>
                <Editor
                  editorState={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                />
                <textarea
                  style={{ display: "none" }}
                  disabled
                  ref={(val) => (userInfo.description = val)}
                  value={draftToHtml(
                    convertToRaw(description.getCurrentContent())
                  )}
                />
                {isError !== null && <div className="errors">Errors </div>}
              </div>

              <div className="form-group col-sm-12 text-right">
                <button type="submit" className="btn btn__theme">
                  {" "}
                  Submit{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
