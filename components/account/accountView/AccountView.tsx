"use client"
import React, { useRef, useState } from "react"
import s from "./account.module.css"
import Image from "next/image"
import AppLayout from "@/components/common/appLayout/AppLayout"
import Button from "@/components/form/button/button"
import { useAuth } from "@/app/context/AuthContext"

const getAge = (birthdate: string): number => {
  var month_diff = Date.now() - new Date(birthdate).getTime()
  var age_dt = new Date(month_diff)
  var year = age_dt.getUTCFullYear()
  return Math.abs(year - 1970)
}

const AccountView: React.FC = () => {
  const { user, token } = useAuth()
  const userAge = user ? getAge(user.birthday) : 0
  const [uploadedPicture, setUploadedPicture] = useState<File | null>(null)
  const [showSubmit, setShowSubmit] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedPicture(event.target.files?.item(0))
      setShowSubmit(true)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!uploadedPicture) return

    const formData = new FormData()
    formData.append("profilePicture", uploadedPicture)

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "bearer " + token,
        "Access-Control-Allow-Origin": "*",
        enctype: "multipart/form-data",
      },
      body: formData,
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/api/v2/users/" +
          user?.id +
          "/upload",
        requestOptions
      )

      if (response.ok) {
        console.log("File uploaded successfully.")
      } else {
        console.error("File upload failed.")
      }
    } catch (error) {
      console.error("Error uploading file:", error)
    }
  }

  if (!user) return null

  return (
    <AppLayout currentPage="Profile">
      <div className={s.pageContent}>
        {/* Profile card */}
        <div className={s.profileCard}>
          <div className={s.avatarWrapper}>
            <Image
              priority={true}
              src={user.pictureUrl ? user.pictureUrl : "/icon-user-profile.png"}
              width={96}
              height={96}
              alt="Photo de profil"
              className={s.avatar}
            />
          </div>
          <div className={s.profileInfo}>
            <h1 className={s.profileName}>
              {user.firstname} {user.lastname}
            </h1>
            <p className={s.profileMeta}>
              {user.city && (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {user.city}
                  {" · "}
                </>
              )}
              {userAge} ans
            </p>
            {user.bio && <p className={s.profileBio}>{user.bio}</p>}
          </div>
        </div>

        {/* Upload zone */}
        <form
          onSubmit={handleSubmit}
          id="uploadPictureForm"
          encType="multipart/form-data"
          className={s.uploadForm}
        >
          <button
            type="button"
            className={s.uploadZone}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Changer la photo de profil"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className={s.uploadLabel}>
              {uploadedPicture
                ? uploadedPicture.name
                : "Changer la photo de profil"}
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            name="profile-picture"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className={s.hiddenInput}
            aria-hidden="true"
          />
          {showSubmit && (
            <div className={s.submitRow}>
              <Button
                type="submit"
                form="uploadPictureForm"
                value="Enregistrer la photo"
                variant="primary"
              />
            </div>
          )}
        </form>
      </div>
    </AppLayout>
  )
}

export default AccountView
