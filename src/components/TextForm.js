import React, { useState } from 'react'

export default function TextForm(props) {
    const [text, setText] = useState("");
    const [word, setword] = useState(" ")
    const [wordcount, setwordcount] = useState("0")

    const handleOnChange = (event) => {
        setText(event.target.value)
    }

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase!", "success");
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase!", "success");
    }

    const handleClearClick = () => {
        let newText = '';
        setText(newText);
        let countid = document.getElementById("counter");
        let occu = document.getElementById("occu");
        occu.style.display = "none";
        countid.style.display = "none";
        props.showAlert("Text cleared!", "success");
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to Clipboard!", "success");
    }

    const handleExtraSpace = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");

    }

    const countWord = () => {
        let countid = document.getElementById("counter");
        countid.style.display = "block";
    }

    const handlewordchange = (event) => {
        console.log(event.target.value)
        setword(event.target.value)
        setwordcount('')
    }

    const handlewordcountclick = () => {
        let countid = document.getElementById("counter");
        let occu = document.getElementById("occu");
        occu.style.display = "block";
        setwordcount((text.split(word)).length - 1)
        setTimeout(() => {
            countid.style.display = "none";
        }, 20000);
    }

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([text], {
            type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        element.click();
        props.showAlert("Text file Downloaded!", "success");
    }

    return (
        <>
            <div style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
                <h1>{props.heading}</h1>
                <div className="input-group">
                    <textarea className="form-control" id="myText" aria-label="With textarea" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? 'black' : 'white', color: props.mode === 'light' ? 'black' : 'white' }} rows={8} placeholder="Enter Text Here"></textarea>
                </div>
                <button className="btn btn-outline-primary my-2 mx-1" onClick={handleUpClick} disabled={text.length === 0}>Convert to UpperCase</button>
                <button className="btn btn-outline-primary my-2 mx-1" onClick={handleLoClick} disabled={text.length === 0}>Convert to LowerCase</button>
                <button className="btn btn-outline-primary my-2 mx-1" onClick={handleExtraSpace} disabled={text.length === 0}>Remove Extra Spaces</button>
                <button className="btn btn btn-outline-primary my-2 mx-1" onClick={countWord} disabled={text.length === 0}>Count Word Occurance</button>
                <button className={`btn btn btn-outline-${props.mode === 'dark' ? 'light' : 'dark'} my-2 mx-1`} onClick={downloadTxtFile} disabled={text.length === 0}>Download Text</button>
                <button className="btn btn-outline-info my-2 mx-1" onClick={handleCopy} disabled={text.length === 0}>Copy Text</button>
                <button className="btn btn btn-outline-danger my-2 mx-1" onClick={handleClearClick} disabled={text.length === 0}>Clear Text</button>



            </div>
            <div>
                <div className="float-start" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
                    <h2>Your text summary</h2>
                    <p className='mx-1'>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Words and {text.length} Characters</p>
                    <p className='mx-1'>{0.008 * text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Minutes to read</p>
                </div>

                <div id="counter" className="float-end me-4 mt-1" style={{ display: "none", color: props.mode === 'light' ? 'black' : 'white' }}>
                    <h2>Word Counter</h2>
                    <div className="input-group mb-2">
                        <input type="text" className="form-control" onChange={handlewordchange} placeholder="Enter Word to find Occurances" aria-label="Counter" aria-describedby="button-addon2" style={{ background: 'transparent', color: props.mode === 'light' ? 'black' : 'white' }} />
                        <button className="btn btn-outline-primary" onClick={handlewordcountclick} type="button" id="button-addon2">Count Occurances</button>
                    </div>
                    <h5 id="occu" style={{ display: "none" }}>{`Occurance of '${word}':- ${wordcount}`}</h5>
                </div>
                <div className='container my-2 mx-0' style={{ display: "inline-block", color: props.mode === 'light' ? 'black' : 'white' }}>
                <h2>Preview</h2>
                <p className='mx-1'>{text.length > 0 ? text : "Nothing to preview here."}</p>
            </div>
            </div>
            
        </>
    )
}