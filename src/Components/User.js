import {useState, useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap'
import { 
        AiTwotoneHeart,
        AiOutlineHeart,
        AiOutlineEdit,
        AiTwotoneDelete,
        AiOutlineMail,
        AiOutlinePhone,
        AiOutlineGlobal } from "react-icons/ai";

const User = ({user, onDelete}) => {
    const [avatar, setAvtar] = useState()
    const [liked, setLiked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    
    const avatarURL = `https://avatars.dicebear.com/v2/avataaars/${user.name}.svg?background=%23f7f7f7`

    useEffect(()=>{
        console.log('called');
        const getAvatar = async () =>{
            let res = await fetch(avatarURL)
            let data = await res.blob()
            data = URL.createObjectURL(data);
            setAvtar(data)

            setIsLoading(()=>false)
        }
        getAvatar()
    },[avatarURL])
    
    const updateUser = (name, email, phone, website) =>{
        user.name = name
        user.email = email
        user.phone = phone
        user.website = website
    }

    const onLike = () =>{
        setLiked((lkd)=>!lkd)
    }
    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-12 my-3 d-flex flex-column">
        
            <div className="card px-0 flex-fill">
                {
                    isLoading ?
                        <div style={{height:"150px"}}>
                            <Loading />
                        </div>
                        :
                        <img className="card-img-top" alt={user.name} src={avatar} width="100" height="150"/> 
                        
                }
                <div className="card-body ">
                    <h5 className="card-title">{user.name}</h5>
                    <div className="card-text">
                        <p className="d-flex "><AiOutlineMail /><span>{user.email}</span></p>
                        <p className="d-flex "><AiOutlinePhone /><span>{user.phone}</span></p>
                        <p className="d-flex "><AiOutlineGlobal/><span>{user.website}</span></p>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-around">
                    <span onClick={onLike}>
                        
                        {
                            liked ?
                            <AiTwotoneHeart style={{color: 'red'}} />:
                            <AiOutlineHeart style={{color: 'red'}}/>
                        }
                        
                        </span>
                    <span onClick={()=>setShowModal(true)}><AiOutlineEdit/></span>
                    <span onClick={()=>onDelete(user)}><AiTwotoneDelete/></span>
                </div>
                       
            </div>
               
            <EditModal user={user} updateUser={updateUser} showModal={showModal} closeModal={()=>setShowModal(()=>false)}/>
            
        </div>
    )
}

const Loading = () => {
    return (
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div> 
            
    )
}

const EditModal = ({user, showModal, closeModal, updateUser}) =>{
    
    const [name,setName] = useState(user.name)
    const [email,setEmail] = useState(user.email)
    const [phone,setPhone] = useState(user.phone)
    const [website,setWebsite] = useState(user.website)


    const handleUpdateUser = () =>{
        if(name && email && phone && website)
            updateUser(name, email, phone, website)
        closeModal()
    }

    return (
        <Modal show={showModal} centered onHide={closeModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Basic Modal</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form className="container">
                    <div className="row px-2 my-4 align-items-center">
                        <p className="col-md-4 text-md-right pl-0"><span style={{color:'red'}}>*</span> Name:</p>
                        <input className="col-md-8 form-control" type="text" name="name" value={name} onChange={(e)=>setName(()=>e.target.value)} required/>
                    </div>
                    <div className="row px-2 my-4 align-items-center">
                        <p className="col-md-4 text-md-right pl-0"><span style={{color:'red'}}>*</span> Email:</p>
                        <input className="col-md-8 form-control" type="text" name="name" value={email} onChange={(e)=>setEmail(()=>e.target.value)} required/>
                    </div>
                    <div className="row px-2 my-4 align-items-center">
                        <p className="col-md-4 text-md-right pl-0"><span style={{color:'red'}}>*</span> Phone:</p>
                        <input className="col-md-8 form-control" type="text" name="name" value={phone} onChange={(e)=>setPhone(()=>e.target.value)} required/>
                    </div>
                    <div className="row px-2 my-4 align-items-center">
                        <p className="col-md-4 text-md-right pl-0"><span style={{color:'red'}}>*</span> Website:</p>
                        <input className="col-md-8 form-control" type="text" name="name" value={website} onChange={(e)=>setWebsite(()=>e.target.value)} required/>
                    </div>
                    
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={closeModal} className="px-4" variant="outline-dark">Cancel</Button>
                <Button onClick={()=>handleUpdateUser()} className="px-4" variant="primary">OK</Button>
            </Modal.Footer>
        </Modal>
        
    )
}
export default User
