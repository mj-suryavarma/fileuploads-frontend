import { useEffect, useState } from 'react';
import './App.css';
import {getSingleFiles,getMultipleFiles} from './data/api'
import FileUploads from './fileupload';


function App() {

const [singleFiles, setSingleFiles] = useState([]);
const [multipleFiles, setMultipleFiles] = useState([]);

const FetchSingleFileList = async() => {
  try {
    const fileList = await getSingleFiles();
    console.log("single files ",singleFiles);
    console.log("filelist ",fileList);
    setSingleFiles(fileList)
    
  } catch (error) {
     throw error
  }
}

const FetchMultipleFileList = async() => {
  try {
    const fileList = await getMultipleFiles();
    setMultipleFiles(fileList);
     console.log("set value",multipleFiles)
  } catch (error) {
     throw error
  }
}

useEffect(() => {
   FetchSingleFileList()
   FetchMultipleFileList();
  }, []);
 

return (
   <div className='mt-3 container'>
     <div className='container'>
       <h3 className='text-center text-weight-bold'>upload single files and multiple files to mongodb</h3>
     </div>
    <FileUploads getSingle={()=> FetchSingleFileList()} getMultiple={() => FetchMultipleFileList()}/>
    <div className='container-fluid mt-5'>
      <div className='row'>
       <div className='col-6'>
       <h4 className='text-success text-weight-bold'>single files lists</h4>
         <div className='row'>
         {singleFiles.map((file, index) =>
         <div className='col-6' key={index}>
          <div className='card mb-2 m-0 p-0'>
           <img src={`http://localhost:5000/${file.filePath}`}
           className="card-img-top img-responsive" 
           alt='images' />
          </div>
         </div>
         )
        }
         </div>
       </div>
       <div className='col-6'>
       <h3 className='text-success text-weight-bold'>Multiple file lists</h3>
          {multipleFiles.map((element,index )=> <div key={index}>
                <h3 className="text-primary text-weight-bold">{element.title}</h3> 
                <div className='row'>
                 {element.files.map((file, index )=> 
                  <div className='col-6' key={index}>
                     <div className='card mb-2 m-0 p-0'>
           <img src={`http://localhost:5000/${file.filePath}`}
           className="card-img-top img-responsive" 
           alt='images' />
          </div>
                  </div>)} 
                </div>
          </div>)}
       </div>
      </div>

    </div>
   </div>
  );
}

export default App;
