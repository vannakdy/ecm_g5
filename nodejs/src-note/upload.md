
https://expressjs.com/en/resources/middleware/multer.html

exports.upload = multer({
    storage : multer.diskStorage({
        destination : function (req,file,callback){
            callback(null,"C:/xampp/htdocs/project/image_ecm_g3")
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    }),
    limits : {
        fileSize : (1024*1024)*3
    },
    fileFilter:(req, file, cb) => {
      console.log(file)
       if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
        cb(null, false);
       } else {
        cb(null, true);
       }
    }
})



Call in controller
// ,upload.single("image")
// ,upload.none()
// ,upload.any()
// ,upload.array("image")

// ,upload.fields([{name:"image",maxCount:2}])
// ,upload.fields([{name:"image",maxCount:1},{name:"image_details",maxCount:10}])



in React.js

<input 
    onChange={onChangeImage} 
    style={{display:'none'}} 
    type="file" 
    id="upload" 
    multiple={true}
/>

const onChangeImage = (even) => {
    var fileObject = even.target.files[0]
    setImageObject(fileObject)
    setImagePreView(URL.createObjectURL(fileObject))
}

var header = {'Content-Type': 'application/json'}
if(data instanceof FormData){
    header = {  'Content-Type': 'multipart/form-data'}
}




Custom Button Upload 


  <label
    style={{
        display:'inline-block',
        backgroundColor:'#eee',
        cursor:'pointer',
        height:80,
        width:80,
        position:'relative',
        borderRadius:10
    }}
    for="upload"
>
    <div style={{
        position:'absolute',
        left:'50%',
        top:'50%',
        transform:"translate(-50%,-50%)"
    }}>
        <Dropdown
            menu={{
                items,
            }}
            placement="topCenter"
            arrow
        >
            {imagePreView ? 
                <div>
                    <img 
                        src={imagePreView}
                        alt={imagePreView}
                        width={80}

                    />
                </div>
                : 
                <div>
                    Image
                </div>
            }
        </Dropdown>
        
    </div>
    <input 
        onChange={onChangeImage} 
        style={{display:'none'}} 
        type="file" 
        id="upload" 
        multiple={true}
    />

</label>



# Remove seleted
    https://bobbyhadz.com/blog/react-reset-file-input

    // 👇️ create a ref for the file input
    const inputRef = useRef(null);

    const resetFileInput = () => {
        // 👇️ reset input value
        inputRef.current.value = null;
    };

    <input ref={inputRef} type="file" onChange={handleFileChange} />
    <button onClick={resetFileInput}>Reset file input</button>


