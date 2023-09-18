import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {

  // const classes=useStyle();
  // const [modalStyle] = useState(getModalStyle);

 
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user,setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){

        console.log(authUser);
        setUser(authUser);

      }else{
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  },[user, username]);



  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
    
  },[]);

  const signUp = (event) =>{
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false);
  }

  const signIn = (event) =>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  return (


        <div className="app">   

       
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
      
      {/* <div style={modalStyle} className={Classes.paper}> */}
     <Box sx={style} alignItems={'center'}>
     <form className='app_signup'>
      <img
        className='app__headerImage'
        src="https://assets.turbologo.com/blog/en/2019/09/19084953/instagram-logo-illustration.png"
        alt=""
        />
        <input
        placeholder='username'
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <input
        placeholder='email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input
        placeholder='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
              <Button type='submit' onClick={signUp}>Sign Up</Button>
              </form>

        </Box>
        
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
      
      {/* <div style={modalStyle} className={Classes.paper}> */}
     <Box sx={style} alignItems={'center'}>
     <form className='app_signup'>
      <img
        className='app__headerImage'
        src="https://assets.turbologo.com/blog/en/2019/09/19084953/instagram-logo-illustration.png"
        alt=""
        />
       
        <input
        placeholder='email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input
        placeholder='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
              <Button type='submit' onClick={signIn}>Sign IN</Button>
              </form>

        </Box>
        
      </Modal>


      <div className="app__header">
        <img
        className='app__headerImage'
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
        />
                  

         {user? (
      <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
        <div>
        <Button onClick={() => setOpenSignIn(true)}>Sign IN</Button>
        <Button onClick={() => setOpen(true)}>Sign UP</Button>  
        </div>
        
      )}
     
      
      
        </div>
     
      
      

<div className="app__posts">
<div className='app_posts_left'>{
      posts.map(({id, post}) => (
        <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}></Post>
      ))
     }
     </div>
     <div className='app_posts_right'>

{/* below is linkedin embed post functionality */}
     {/* <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7107292621340835840" height="1059" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
     <br/>
     <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7108008500101816320" height="757" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe> */}
     {/* <InstagramEmbed
  url='https://instagr.am/p/Zw9o4/'
  clientAccessToken='123|456'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
 
/> */}

     </div>
     
     </div>
      


     {user?.displayName ? (
          <ImageUpload  username={user.displayName}  />
        ): (
          <div className='bottom__msg'>Please login to upload your fav pictures !! </div>
        )}

    </div>




  );
}

export default App;
