import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import { Container, Button, Form, Modal, Col, Row } from 'react-bootstrap';
import {  ProfileIcon } from "../../components/Icons";
import logo from "../../assets/sporology-logo.svg"
import {toast,Toaster} from "react-hot-toast";
import ProfileForm from "../../components/forms/profileForm";

function PartnerProfile() {
  
  return (
    <>
    <ProfileForm/>
    </>
  );
}

export default PartnerProfile;
