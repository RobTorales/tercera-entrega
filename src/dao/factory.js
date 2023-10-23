import {PERCISTENCE, MONGO_CNX_STR } from "../config/config.js";
import mongoose from "mongoose";
import ContactsMemory from "../contactmemory/contactMemory.js";

let Contacts;

switch(PERCISTENCE){
    case"MONGO":
        const connection = mongoose.connect(MONGO_CNX_STR)
        const {default:ContactsMDB} = await import ("../mongo/contacts.js");
        Contacts = ContactsMDB;
        break;
    case "MEMORY":
        const {default:ContactsMemory} = await import ("../contactmemory/contactMemory.js")

}