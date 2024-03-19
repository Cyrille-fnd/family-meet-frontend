'use client'
import React, {useState} from "react";
import s from "./account.module.css"
import Image from "next/image";
import SideMenu from "../../common/sideMenu/sideMenu";
import Button from "@/components/form/button/button";

interface AccountViewProps {
    user: User
    token: string
}

const getAge = (birthdate: string): number => {
    var month_diff = Date.now() - new Date(birthdate).getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();

    return Math.abs(year - 1970);
}

const AccountView: React.FC<AccountViewProps> = ({user, token}) => {
    const userAge = getAge(user.birthday)
    const [uploadedPicture, setUploadedPicture] = useState<any>()
    const [showSubmit, setShowSubmit] = useState(false)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setUploadedPicture(event.target.files?.item(0))
            setShowSubmit(prevState => !prevState)
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('profilePicture', uploadedPicture);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'bearer '+token,
                'Access-Control-Allow-Origin': "*",
                'enctype': 'multipart/form-data'
            },
            body: formData,
        };

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/api/users/' + user.id + '/upload', requestOptions);

            if (response.ok) {
                console.log('File uploaded successfully.');
            } else {
                console.error('File upload failed.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    return (
        <div className={s.container}>
            <div>
                <SideMenu currentPage="Profile"/>
            </div>
            <div className={s.blocContainer}>
                <div className={s.profileContainer}>
                    <Image
                        priority={true}
                        src={user.pictureUrl ? user.pictureUrl: "/icon-user-profile.png"}
                        width={250}
                        height={250}
                        alt={'user-profile-photo'}
                        className="rounded-[50%]"
                    />
                    <h1>{user.firstname} {user.lastname}</h1>
                    <p> {user.city}</p>
                    <p> {userAge} ans</p>
                    <p> {user.bio} </p>
                </div>
                <form onSubmit={handleSubmit} id="uploadPictureForm" encType="multipart/form-data">
                    <input type="file" name="profile-picture" accept="image/png, image/jpeg" onChange={handleFileChange}/>
                    {showSubmit && <Button type="submit" form="uploadPictureForm" value="Enregistrer la photo" />}
                </form>
            </div>
        </div>
    )
}

export default AccountView
