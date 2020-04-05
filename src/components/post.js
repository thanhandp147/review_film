
import Axios from "axios";
import Movie from "./../../components/movie";

import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from '@material-ui/core/Button';

import styled from 'styled-components';
import { Container, Hidden } from '@material-ui/core';
import { MAIN_COLOR } from '../../constants/color'
// import { EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// Quill.register('modules/imageResize', ImageResize);

const MainContainer = styled.div`
  background-color:#FFFFFF;
`
const Title = styled.p`
  color:${MAIN_COLOR};
  font-size:30px;
  font-weight:bold;
  text-align:center;
`
const Card = styled.div`
  display:flex;
  background-color:'#000000';
`

class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      isShowPost: false
    };
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  _handleSave = () => {
    this.setState({
      isShowPost: true
    })
  }

  convertImages = (htmlText) => {
    const regex = /<img\s[^>]*?style\s*=\s*['\"]float([^'\"]*?)['\"][^>]*?>/g;
    let m;
    while ((m = regex.exec(htmlText)) !== null) {
      if (m.index === regex.lastIndex) regex.lastIndex++;
      let repl = null, type = null;
      m.forEach((match, groupIndex) => {
        if (groupIndex == 0) repl = match;
        if (groupIndex == 1) type = match;
        if (repl && type) {
          if (type.includes('none')) htmlText = htmlText.replace(repl, `<div style="text-align: center;width: 100%;">` + repl + '</div>');
          else htmlText = htmlText.replace(repl, `<div style="text-align :center; width: 100%;">` + repl + '</div>');
          repl = null;
          type = null;
        }
      });
    }
    return htmlText;
  }

  render() {
    const { editorState } = this.state;
    console.log(editorState);

    return (
      <Container>
        <div>
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
          <Button
            onClick={this._handleSave}
            variant="contained" color="primary">
            Primary
          </Button>
        </div>

        {
          this.state.isShowPost &&
          <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} />
          // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        }

      </Container>
    );
  }
}

export default EditorConvertToHTML