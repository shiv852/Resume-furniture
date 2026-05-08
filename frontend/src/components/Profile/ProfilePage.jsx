import React, { useState } from 'react'
import styles from '../../styles/styles'
import ProfileSideBar from './ProfileSideBar'
import ProfileContent from './ProfileContent'

const ProfilePage = () => {

  const [ active , setActive ] = useState(1)

  return (
    <>
    <div>
      <br />
      <br />
      <br />
      <br />
       <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className='w-[335px]'>
          <ProfileSideBar active={active} setActive={setActive}/>
        </div>
           <ProfileContent active={active}/>
       </div>
    </div>
    </>
  )
}

export default ProfilePage
