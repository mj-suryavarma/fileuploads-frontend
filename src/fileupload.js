import React,{useState} from 'react';
import {singleFileUpload,multipleFilesUpload} from './data/api';
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';


function FileUploads(props) {
 
    const [singleFile, setSingleFile] = useState("");
    const [multipleFiles, setMultipleFiles] = useState("");
    const [title , setTitle] = useState('');
    const [singleProgress, setSingleProgress] = useState(0);
    const [multipleProgress, setMultipleProgress] = useState(0);


    const singleFileChange =(e)=>{
        setSingleFile(e.target.files[0])
    }

    const multipleFilesChange =(e)=>{
        setMultipleFiles(e.target.files)
    }

        const singleFileOption = {
            onUploadProgress : (progressEvent) => {
            const {loaded, total} = progressEvent;
              const percentage = Math.floor(((loaded/1000) * 100) / (total /1000));
              setSingleProgress(percentage);
              
              setTimeout(() => {
                  setSingleProgress(0);
              }, 10000);
            }
        }
        
        const MultipleFileOption = {
            onUploadProgress : (progressEvent) => {
            const { loaded, total} = progressEvent;
              const percentage = Math.floor(((loaded/1000) * 100) / (total /1000));
              setMultipleProgress(percentage);

              setTimeout(() => {
                  setMultipleProgress(0)
              }, 10000);
            }
        }

    const uploadSingleFile = async() =>{
        const formData = new FormData();
         formData.append("file",singleFile)
         await singleFileUpload(formData,singleFileOption);
         props.getSingle();
    }

    const uploadMultipleFiles = async() =>{ 
        const formData = new FormData();
        formData.append("title",title)
        for (let i = 0; i < multipleFiles.length; i++) { 
              formData.append("files",multipleFiles[i]);
        }  
        await multipleFilesUpload(formData, MultipleFileOption)
        props.getMultiple();
    }

    return (
        <div className="row">
        <div className="col-6 "> 
            <div className="form-group">
              <label>upload single file (image only)</label>
              <input type="file" 
              className="form-control m-3" 
              accept='image/*'
              onChange={(e) => singleFileChange(e)}></input>
            </div>
            <div className="row">
                <div className="col-10">
                 <button className="btn btn-danger m-3"
                 onClick={() => uploadSingleFile()}>upload</button>
                </div>
                <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar value={singleProgress} text={`${singleProgress} %`}  />
            </div>
            </div>
        </div>
        <div className="col-6 row">
            <div className='form-group col-10 m-3'>
                <label >Title</label>
                 <input 
                 className='form-control' 
                 type="text"
                 required
                 onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div className="form-group ">
              <label>upload multiple files</label>
              <input type="file" 
              className="form-control m-3"
               multiple 
               required
              onChange={(e) => multipleFilesChange(e)}
              ></input>
            </div>
            <div className="row">
                <div className="col-10">
                 <button className="btn btn-danger m-3"
                  onClick={() => uploadMultipleFiles()}
                 >upload</button>
                </div>
                <div style={{ width: 100, height: 100 }} >
  <CircularProgressbar value={multipleProgress} text={`${multipleProgress} %`} />
</div>
            </div>
        </div> 
     </div>
    )
}

export default FileUploads
