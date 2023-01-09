import * as React from 'react';
import {Link} from "react-router-dom";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {storage} from "../../firebase";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {useDispatch, useSelector} from "react-redux";
import {v4} from "uuid";
import {editAccount, getAccount} from "../../services/accountService";
import "./editProfile.css"

export default function EditProfile({accountInfo}) {
    const accountId = accountInfo.accountId
    const [open, setOpen] = React.useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [img, setImg] = useState("");
    const imagesListRef = ref(storage, "images/");
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();
    const accounts = useSelector((state) => {
        return state.accountInfo.accountInfo
    })
    let account= {}
        if (accounts.accountId === accountId){
            account = accounts
        }

    const handleEdit = async (values) => {
        let imgSent
        if (img !== "") {
            imgSent = img
        } else imgSent = values.img
        let data = {
            ...values,
            img: imgSent
        }
        await dispatch(editAccount(data));
        // await dispatch(getAccount())
    }
    const uploadFile = (imageUpload) => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((img) => {
                setImg(img)
                setSubmitting(false)
            });
        })
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((img) => {
                    setImageUrls((prev) => [...prev, img]);
                });
            })
        })
    }, []);

    return (
        <React.Fragment>
            <Link
                color="neutral"
                style={{color: "#007bff", backgroundColor: "white", textDecoration: "none"}}
                className={'btn-primary'}
                onClick={() => setOpen(true)}
            >
                Edit Profile
            </Link>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    style={{color: "black", width: 600, boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.75)'}}
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{
                        borderRadius: 'md',
                        p: 3
                    }}
                >
                    <Typography
                        id="basic-modal-dialog-title"
                        component="h2"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                    >
                        Edit
                    </Typography>
                    <Typography
                        id="basic-modal-dialog-description"
                        mt={0.5}
                        mb={2}
                        textColor="black"
                        textAlign={"center"}
                    >
                    </Typography>
                    <Formik
                        initialValues={
                            {
                                displayName: account.displayName,
                                img: account.img,
                                birthday: account.birthday,
                                location: account.location,
                                accountId: account.accountId
                            }
                        }
                        onSubmit={(values) => {
                            handleEdit(values)
                            setOpen(false)
                        }}>
                        <Form>
                            <div className={"post-group"}>
                                <div className="form-group">
                                    <label htmlFor=""> DisplayName</label>
                                    <Field type={'text'} style={{width: '100%'}} name={'displayName'} className={'form-control'}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Location</label>
                                    <Field type={'text'} style={{width: '100%'}} name={'location'} className={'form-control'}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Birthday</label>
                                    <Field type={'date'} name={'birthday'}  className={'form-control'}/>
                                </div>
                                <div className="form-group">
                                    <label className="custom-file-upload">
                                        <i className="fa fa-cloud-upload"></i>
                                        Custom Upload
                                        <input
                                            id="file-upload"
                                            type="file"
                                            onChange={(event) => {
                                                setSubmitting(true)
                                                uploadFile(event.target.files[0])
                                            }}/>
                                    </label>

                                    <button className="editProfile" type="submit" disabled={submitting}>Edit</button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </ModalDialog>
            </Modal>

        </React.Fragment>
    )
}