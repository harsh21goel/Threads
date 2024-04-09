import {useState} from 'react'
import useshowToast from "./useshowToast"
function useImagepreview() {
    const [imageUrl, setimageUrl] = useState(null)
    const showtoast=useshowToast()
    const handleImageChange=(e)=>{
        const file=e.target.files[0]
        // console.log(file);
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()

            reader.onloadend =()=>{
                setimageUrl(reader.result)
            }
            reader.readAsDataURL(file)

        }else{
            showtoast("Invalid file type","Please select a image file","error")
            setimageUrl(null)
        }
    }
// console.log(imageUrl);
  return {handleImageChange,imageUrl}
}

export default useImagepreview