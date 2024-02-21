"use client";

import React, { useEffect, useState } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  Modifier,
  RichUtils,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CodeEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const content = localStorage.getItem("editorContent");
    if (content) {
      try {
        const parsedContent = JSON.parse(content);
        const contentState = convertFromRaw(parsedContent);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Error loading saved editor content: ", error);
      }
    }
  }, []);
  const style = {
    RED: {
      color: "rgba(255, 0, 0, 1.0)",
    },
  };

  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(raw));
    alert("Content saved");
  };

  const handleEditorChange = (newEditorState) => {
    const selection = newEditorState.getSelection();
    const contentState = newEditorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const blockText = block.getText();

    // Check for '#' at the start of the block followed by space
    if (blockText.startsWith("# ") && selection.getStartOffset() === 2) {
      const newText = blockText.slice(2);
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: block.getLength(),
        }),
        newText,
        block.getInlineStyleAt(0)
      );

      const withReplacedText = EditorState.push(
        newEditorState,
        newContentState,
        "change-block-type"
      );
      const withHeading = RichUtils.toggleBlockType(
        withReplacedText,
        "header-one"
      );

      setEditorState(withHeading);
    } else if (
      blockText.startsWith("*** ") &&
      selection.getStartOffset() === 4
    ) {
      const newText = blockText.slice(4);
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: block.getLength(),
        }),
        newText,
        block.getInlineStyleAt(0)
      );

      const withReplacedText = EditorState.push(
        newEditorState,
        newContentState,
        "change-inline-style"
      );
      const withHeading = RichUtils.toggleInlineStyle(
        withReplacedText,
        "UNDERLINE"
      );

      setEditorState(withHeading);
    } else if (
      blockText.startsWith("** ") &&
      selection.getStartOffset() === 3
    ) {
      const newText = blockText.slice(3);
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: block.getLength(),
        }),
        newText,
        block.getInlineStyleAt(0)
      );

      const withReplacedText = EditorState.push(
        newEditorState,
        newContentState,
        "change-inline-style"
      );
      const withHeading = RichUtils.toggleInlineStyle(withReplacedText, "RED");

      setEditorState(withHeading);
    } else if (blockText.startsWith("* ") && selection.getStartOffset() === 2) {
      const newText = blockText.slice(2);
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: block.getLength(),
        }),
        newText,
        block.getInlineStyleAt(0)
      );

      const withReplacedText = EditorState.push(
        newEditorState,
        newContentState,
        "change-inline-style"
      );
      const withHeading = RichUtils.toggleInlineStyle(withReplacedText, "BOLD");

      setEditorState(withHeading);
    } else {
      setEditorState(newEditorState);
    }
  };

  return (
    <>
      <div className="container flex flex-col justify-center items-center mb-14 pt-8 pb-1">
        <div className="flex justify-end right-5 py-5">
          <button
            type="button"
            onClick={saveContent}
            className="text-white bg-black hover:bg-blue-800 focus:ring-4
              text-xl rounded-lg text-sm px-5 py-2.5 me-2 mb-2
            dark:bg-black-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-black-800 w-52
             hover:cursor-pointer"
          >
            Save
          </button>
        </div>
        <div className="editor h-96 overflow-auto w-full mb-7  rounded-md text-black border-5 border-solid border-white bg-white">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName="w-full h-96 "
            editorClassName="h-100 overflow-auto px-4 "
            customStyleMap={style}
            
          />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
