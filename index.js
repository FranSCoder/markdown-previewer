//Insert line breaks when return carriages are detected and gives a beautiful javascript style highlighting to <code> elements.

marked.setOptions({
	gfm: true,
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

//Auto-insert "target=_blank" attributes to <a> elements displayed on the Preview window.

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return '<a target="_blank" href="'+ href + '">' + text + '</a>';  
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalText: placeholder,
      editorMaximized: false,
      previewMaximized: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  handleChange(e) {
    this.setState({
      originalText: e.target.value
    })
  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    })
  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    })
  }
  render() {
		const cases = this.state.editorMaximized
			? ["editorContainer maximized", "previewContainer hide", "fa-solid fa-down-left-and-up-right-to-center"]
			: this.state.previewMaximized
			? ["editorContainer hide", "previewContainer maximized", "fa-solid fa-down-left-and-up-right-to-center"]
			: ["editorContainer", "previewContainer", "fa-solid fa-maximize"];
    return (
      <div>
        <div className={cases[0]}>
          <Toolbar
						icon={cases[2]}
						onClick={this.handleEditorMaximize}
						text="Editor"
					/>
          <Editor originalText={this.state.originalText} onChange={this.handleChange} />
        </div>
        <div className={cases[1]}>
          <Toolbar
						icon={cases[2]}
						onClick={this.handlePreviewMaximize}
						text="Preview"
					/>
          <Preview originalText={this.state.originalText} />
        </div>        
      </div>
    )
  }
}

const Toolbar = (props) => {
  return (
    <div className="toolbar">
    	<i className="fa-brands fa-free-code-camp" />
			{props.text}
			<i className={props.icon} onClick={props.onClick}/>
    </div>
		
  );
};

const Editor = function(props) {
  return (
    <textarea
			id="editor"
			onChange={props.onChange}
			type="text"
			value={props.originalText}
		/>
  );
};

const Preview = function(props) {
  return (
    <div
		dangerouslySetInnerHTML={{
				__html: marked(props.originalText, { renderer: renderer })
			}}
			id="preview"
		/>
  );
};

const placeholder = `# This is a heading element.

## This is a sub-heading element.

### This is a sub-sub-heading element.

This is a [link](https://www.freecodecamp.org)

This is an example of \`in-line code\`

\`\`\`
// This is an example of block code

function() {
  return "Function example"
}
\`\`\`

- This is an example
  - of indented
    - list

> This is an example of Block Quote

This is an example of an embedded image

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

This is an example of **bold text**.`

ReactDOM.render(<App />, document.getElementById("app"))