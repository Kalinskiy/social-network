import React from 'react';
import s from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div>

            <div className={s.mainPicture}>
                <img
                    src="https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg"
                    alt=""/>

            </div>

            <div className={s.ava}>
                <img src="https://img.pngio.com/png-avatar-108-images-in-collection-page-3-png-avatar-300_300.png"
                />


            </div>
            <div className={s.desciptionBlock}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium
                assumenda autem cum dolore est excepturi, exercitationem illo labore nam non odio officia possimus quae
                repellendus unde voluptates. Asperiores eius facilis libero mollitia, nam placeat recusandae repellat
                repellendus vel velit!
            </div>

        </div>
    )
}
export default ProfileInfo;