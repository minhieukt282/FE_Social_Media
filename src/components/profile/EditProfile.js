import * as React from 'react';
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {storage} from "../../firebase";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {useDispatch, useSelector} from "react-redux";
import {v4} from "uuid";
import {editAccount} from "../../services/accountService";
import "./editProfile.css"
import {toast} from "react-toastify";

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
    let account = {}
    if (accounts.accountId === accountId) {
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
        if (data.displayName.length <= 15) {
            await dispatch(editAccount(data));
            toast.success('Successful change!', {
                position: toast.POSITION.BOTTOM_LEFT
            });
        } else {
            toast.warn('The name is too long!', {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }

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
            <span
                onClick={() => setOpen(true)}
            >
                Edit Profile
            </span>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    style={{color: "black", width: 600, boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.75)'}}
                    aria-labelledby="basic-modal-dialog-user"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{
                        borderRadius: 'md',
                        p: 3
                    }}
                >
                    <Typography
                        id="basic-modal-dialog-user"
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
                            let name = values.displayName.replace(/^\s+|\s+$/gm, '')
                            let location = values.location.replace(/^\s+|\s+$/gm, '')
                            if (name !== '' && location !== '') {
                                handleEdit(values)
                                setOpen(false)
                            } else {
                                setOpen(false)
                            }
                        }}>
                        <Form>
                            <div className={"post-group"}>
                                <div className="form-group">
                                    <label htmlFor=""> DisplayName</label>
                                    <Field type={'text'} style={{width: '100%'}} name={'displayName'}
                                           className={'form-control'}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Location</label>
                                    <Field type={'text'} style={{width: '100%'}} name={'location'}
                                           className={'form-control'}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Birthday</label>
                                    <Field type={'date'} name={'birthday'} className={'form-control'}/>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label className="custom-file-upload mb-0">
                                        <i className="fas fa-camera"></i> Photo
                                        <input
                                            id="file-upload"
                                            type="file"
                                            onChange={(event) => {
                                                setSubmitting(true)
                                                uploadFile(event.target.files[0])
                                            }}/>
                                    </label>
                                    <button className="btn btn-primary" type="submit" disabled={submitting}>Edit
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </ModalDialog>
            </Modal>

        </React.Fragment>
    )
}
