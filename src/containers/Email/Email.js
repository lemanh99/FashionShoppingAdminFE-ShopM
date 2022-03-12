import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axiosIntance from "../../helpers/axios";
import moment from 'moment';
import { convert_date_from_timestamp } from "../../utils/datetime";

const Email = () => {
    const [componentMail, setComponentMail] = useState("1");
    const [data, setData] = useState([])
    const [contentEmail, setContentEmail] = useState("")
    const [selectedTo, setSelectedTo] = useState("1");
    const [toEmail, setToEmail] = useState("");
    const [subject, setSubject] = useState("")
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [disable, setDisable] = useState(true)
    const [pagination, setPagination] = useState({})
    const [page, setPage] = useState(1)
    const [searchWord, setSearchWord] = useState("")
    useEffect(() => {
        getAllEmail()
    }, [])

    const getAllEmail = (page_edit) => {
        if (typeof page_edit === "undefined") {
            page_edit = page
        }
        axiosIntance.get(`/setting/mail/?page=${page_edit}&record_limit=10&search_keyword=${searchWord}`).then((res) => {
            if (res && res.status === 200) {
                const { data } = res.data;
                setData(data.items)
                setPagination(data.pagination)
            }
        })
    }

    const onClickSendMail = (e) => {
        e.preventDefault()
        console.log(contentEmail)
        const mail = {
            "type": parseInt(selectedTo),
            "subject": subject,
            "to": toEmail,
            "cc": "",
            "content_text": draftToHtml(convertToRaw(editorState.getCurrentContent())),
            "content_html": draftToHtml(convertToRaw(editorState.getCurrentContent())),
        }
        axiosIntance.post(`setting/mail/send-mail`, { ...mail }).then((res) => {
            if (res.status == 200) {
                getAllEmail()
            }
        }).then(() => {
            setContentEmail("");
            setSelectedTo("1")
            setToEmail("")
            setSubject("")
            setEditorState(EditorState.createEmpty())
            setComponentMail("2")
        })

    }
    const onClickButtonSent = () => {
        setContentEmail("");
        setSelectedTo("1")
        setToEmail("")
        setSubject("")
        setEditorState(EditorState.createEmpty())
        setComponentMail("1")
        setDisable(true)
    }

    const onClickDetail = (email) => {
        const blocksFromHTML = convertFromHTML(email.content_html);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        );
        setContentEmail(email.content_html);
        setSelectedTo(String(email.type))
        setToEmail(email.to)
        setSubject(email.subject)
        setEditorState(EditorState.createWithContent(state))
        setComponentMail("1")
        setDisable(false)

    }
    const convertHtmlToString = (html) => {
        var htmlString = html;
        var plainString = htmlString.replace(/<[^>]+>/g, '');
        return String(plainString).slice(0, 15)
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    };
    const getDayDiff = timestamp => {
        let a = moment();
        let b = moment(timestamp);
        let diff = a.diff(b, 'year');
        if (diff === 0) {
            diff = a.diff(b, 'month');
            if (diff === 0) {
                diff = a.diff(b, 'days');
                if (diff === 0) {
                    diff = a.diff(b, 'hour');
                    if (diff === 0) {
                        diff = a.diff(b, 'minute');
                        if (diff === 0) {
                            diff = a.diff(b, 'second');
                            return `${diff} second before`;
                        } else {
                            return `${diff} minute before`;
                        }
                    } else {
                        return `${diff} hour before`;
                    }
                } else {
                    return `${diff} day before`;
                }
            } else {
                return convert_date_from_timestamp(timestamp);
            }
        } else {
            return convert_date_from_timestamp(timestamp);
        }
    };
    const addPage = () => {
        if (pagination) {
            if (pagination && pagination.total_items > page * 10) {
                setPage(page + 1)
                getAllEmail(page + 1)
            }

        }

    }
    const reducePage = () => {
        if (page > 1) {
            setPage(page - 1)
            getAllEmail(page - 1)
        }

    }


    return (
        <Layout title="Email">
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            {/* <a href="mailbox.html" className="btn btn-primary btn-block mb-3">Back to Inbox</a> */}
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Folders</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <ul className="nav nav-pills flex-column">
                                        <li className="nav-item" onClick={() => onClickButtonSent()}>
                                            <a href="#" className="nav-link">
                                                <i className="far fa-envelope" /> Sent
                                            </a>
                                        </li>
                                        <li className="nav-item active" onClick={() => setComponentMail("2")}>
                                            <a href="#" className="nav-link">
                                                <i className="fas fa-inbox" /> Inbox Sented
                                                {/* <span className="badge bg-primary float-right">12</span> */}
                                            </a>
                                        </li>

                                        {/* <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-file-alt" /> Drafts
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="fas fa-filter" /> Junk
                                                <span className="badge bg-warning float-right">65</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-trash-alt" /> Trash
                                            </a>
                                        </li> */}
                                    </ul>
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                        {/* /.col */}
                        {componentMail == "1" ? (<div className="col-md-9">
                            <div className="card card-primary card-outline">

                                <div className="card-header">
                                    <h3 className="card-title">Message</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    {/* <a href="mailbox.html" className="btn btn-primary btn-block mb-3">Back to Inbox</a> */}
                                    <select
                                        className="form-group form-control "
                                        value={selectedTo}
                                        onChange={(e) => setSelectedTo(e.target.value)}
                                    >
                                        <option value="1">SEND TO</option>
                                        <option value="2">EMAIL SUBSCRIBE</option>

                                    </select>
                                    {selectedTo == "1" ? (
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                placeholder="To:"
                                                value={toEmail}
                                                onChange={(e) => setToEmail(e.target.value)}
                                            />
                                        </div>
                                    ) : null}


                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            placeholder="Subject:"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                        />
                                    </div>
                                    {/* <div className="form-group">
                                        <textarea
                                            id="compose-textarea"
                                            className="form-control"
                                            style={{ height: '300px' }}
                                            value={contentEmail}
                                            placeholder="Content emal"
                                        // onChange={(e) => setContentEmail(e.target.value)}
                                        />
                                    </div> */}
                                    <div className="form-group">
                                        {/* <div className="btn btn-default btn-file">
                                            <i className="fas fa-paperclip" /> Attachment
                                            <input type="file" name="attachment" />
                                        </div>
                                        <p className="help-block">Max. 32MB</p> */}
                                        <div>
                                            <Editor
                                                editorState={editorState}
                                                wrapperClassName="demo-wrapper"
                                                editorClassName="demo-editor form-control"
                                                onEditorStateChange={onEditorStateChange}
                                            />
                                            {/* <textarea
                                                disabled
                                                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                            /> */}
                                        </div>
                                    </div>

                                </div>
                                {/* /.card-body */}
                                {disable ? (
                                    <div className="card-footer">
                                        <div className="float-right">
                                            {/* <button type="button" className="btn btn-default"><i className="fas fa-pencil-alt" /> Draft</button> */}
                                            <button type="submit" className="btn btn-primary" onClick={(e) => onClickSendMail(e)}><i className="far fa-envelope" /> Send</button>
                                        </div>
                                        {/* <button type="reset" className="btn btn-default"><i className="fas fa-times" /> Discard</button> */}
                                    </div>
                                ) : (<div className="card-footer">
                                    <div className="float-right">
                                        {/* <button type="button" className="btn btn-default"><i className="fas fa-pencil-alt" /> Draft</button> */}
                                        <button type="submit" className="btn btn-primary" onClick={(e) => setComponentMail("2")}><i className="fas fa-reply" /> Back</button>
                                    </div>
                                    {/* <button type="reset" className="btn btn-default"><i className="fas fa-times" /> Discard</button> */}
                                </div>)}

                                {/* /.card-footer */}
                            </div>
                            {/* /.card */}
                        </div>) : (
                            <div className="col-md-9">
                                <div className="card card-primary card-outline">
                                    <div className="card-header">
                                        <h3 className="card-title">Inbox</h3>
                                        <div className="card-tools">
                                            <div className="input-group input-group-sm">
                                                <input type="text" className="form-control" placeholder="Search Mail" value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" onClick={() => getAllEmail()}>
                                                        <i className="fas fa-search" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /.card-tools */}
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body p-0">
                                        <div className="mailbox-controls">
                                            {/* Check all button */}
                                            {/* <button type="button" className="btn btn-default btn-sm checkbox-toggle"><i className="far fa-square" />
                                            </button> */}
                                            <div className="btn-group">
                                                {/* <button type="button" className="btn btn-default btn-sm"><i className="far fa-trash-alt" /></button> */}
                                                {/* <button type="button" className="btn btn-default btn-sm"><i className="fas fa-reply" /></button>
                                            <button type="button" className="btn btn-default btn-sm"><i className="fas fa-share" /></button> */}
                                            </div>
                                            {/* /.btn-group */}
                                            <button type="button" className="btn btn-default btn-sm" onClick={() => getAllEmail()}><i className="fas fa-sync-alt" /></button>
                                            <div className="float-right">
                                                {page}-{pagination && pagination.total_items < page * 10 ? pagination.total_items : page * 10}/{pagination && pagination.total_items}
                                                <div className="btn-group" style={{ marginLeft: '10px' }}>
                                                    <button type="button" className="btn btn-default btn-sm" onClick={reducePage}><i className="fas fa-chevron-left" /></button>
                                                    <button type="button" className="btn btn-default btn-sm" onClick={addPage}><i className="fas fa-chevron-right" /></button>
                                                </div>
                                                {/* /.btn-group */}
                                            </div>
                                            {/* /.float-right */}
                                        </div>
                                        <div className="table-responsive mailbox-messages">
                                            <table className="table table-hover table-striped">
                                                <tbody>
                                                    {data && data.length > 0 ?
                                                        data.map((item, index) => (
                                                            <tr>
                                                                <td
                                                                    className="mailbox-name"
                                                                    width="18%"
                                                                    key={item.id}
                                                                    onClick={() => onClickDetail(item)}
                                                                >
                                                                    <a href="#">{item.type == "1" ? ("Some people") : item.type == "2" ? ("Email subscribe") : "People"}</a>
                                                                </td>
                                                                <td className="mailbox-subject" width="62%"><b>{item.subject}</b> - {convertHtmlToString(item.content_html)}...
                                                                </td>
                                                                {/* <td className="mailbox-attachment" /> */}
                                                                <td className="mailbox-date" width="20%">{getDayDiff(item.created_at)}</td>
                                                            </tr>
                                                        )) : null}

                                                </tbody>
                                            </table>
                                            {/* /.table */}
                                        </div>
                                        {/* /.mail-box-messages */}
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer p-0" >
                                        <div className="mailbox-controls">
                                            {/* Check all button */}
                                            {/* <button type="button" className="btn btn-default btn-sm checkbox-toggle"><i className="far fa-square" />
                                            </button>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-default btn-sm"><i className="far fa-trash-alt" /></button>
                                                <button type="button" className="btn btn-default btn-sm"><i className="fas fa-reply" /></button>
                                                <button type="button" className="btn btn-default btn-sm"><i className="fas fa-share" /></button>
                                            </div> */}
                                            {/* /.btn-group */}
                                            {/* <button type="button" className="btn btn-default btn-sm"><i className="fas fa-sync-alt" /></button> */}
                                            <div className="float-right">
                                                {page}-{pagination && pagination.total_items < page * 10 ? pagination.total_items : page * 10}/{pagination && pagination.total_items}
                                                <div className="btn-group" style={{ marginLeft: '10px' }}>
                                                    <button type="button" className="btn btn-default btn-sm" onClick={reducePage}><i className="fas fa-chevron-left" /></button>
                                                    <button type="button" className="btn btn-default btn-sm" onClick={addPage}><i className="fas fa-chevron-right" /></button>
                                                </div>
                                                {/* /.btn-group */}
                                            </div>
                                            {/* /.float-right */}
                                        </div>
                                    </div>
                                </div>
                                {/* /.card */}
                            </div>
                        )}

                        {/* /.col */}



                    </div>
                    {/* /.row */}
                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}


        </Layout >
    );
};

export default Email;
