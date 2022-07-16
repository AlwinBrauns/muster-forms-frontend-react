import './FormAddItem.scss'
import {Form, Formik, Field, ErrorMessage} from "formik";
import {Fragment, useRef, useState} from "react";
import {BackendService} from "../../services/backend.service";

export default function FormAddItem(props){
    const [showSubForm, setShowSubForm] = useState(false)
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        BackendService.postItem({
            title: values.title,
            description: values.description,
            elements: values.itemComponents
        }).finally(
            ()=> {
                resetForm()
                setSubmitting(false)
            }
        )
    }
    const validate = (values) => {
        const errors = {}
        if(!values.title){
            errors.title = "title is needed"
        }
        if(!values.description){
            errors.description = "description is needed"
        }
        return errors
    }
    return (
        <div className="FormAddItem">
            <h2>Add Item</h2>
            <Formik
                initialValues={{title: "", description: "", itemComponents: []}}
                validate={validate}
                onSubmit={onSubmit}
            >
                {
                    ({
                        isSubmitting,
                        errors,
                        values,
                        touched,
                        handleChange
                    }) => (
                        <Form>
                            <h3>Item</h3>
                            <Field type="text" name={"title"} placeholder={"title"} className={(errors.title&&touched.title)?"warn-outline":""} required/>
                            <ErrorMessage name={"title"} component={"span"} className={"warn"} />
                            <Field type="text" name={"description"} className={(errors.description&&touched.description)?"warn-outline":""} placeholder={"description"} required/>
                            <ErrorMessage name={"description"} component={"span"} className={"warn"} />
                            <h3 className="elements-title" onClick={_=>setShowSubForm(!showSubForm)}>Components of the item</h3>
                            {
                                showSubForm?<FormAddItemComponents
                                    values={values}
                                    handleChange={handleChange}
                                />:null
                            }
                            <hr/>
                            <input type="submit" value={"add item"} disabled={isSubmitting || !values.title || !values.description}/>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

function FormAddItemComponents({values, handleChange}){
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(1)
    const [showEdit, setShowEdit] = useState([])
    const closeEditItemComponentButton = useRef(null)
    const addItemComponentButton = useRef(null)
    const addItemComponent = (component) => {
        values.itemComponents.push(component)
        setTitle("")
        setAmount(1)
        let newShowEdit = [...showEdit]
        newShowEdit.push(false)
        setShowEdit(newShowEdit)
    }
    return (
            <div className={"elements"}>
                {
                    <ul className={"added-elements"}>
                        {
                            values.itemComponents.map((value, index) => {
                                return (
                                    <Fragment key={index}>
                                        <li>
                                            {value.amount} {value.title}
                                            {
                                                showEdit[index]?
                                                <div className={"edit-element"}>
                                                    <span ref={closeEditItemComponentButton} className={"close-edit-element"} onClick={_=>{
                                                        let newShowEdit = [...showEdit]
                                                        newShowEdit.forEach((val, i) => {
                                                            newShowEdit[i] = false
                                                        })
                                                        setShowEdit(newShowEdit)
                                                        setTitle("")
                                                        setAmount(1)
                                                    }}>X</span>
                                                    <input
                                                        name={`itemComponents[${index}].title`}
                                                        type="text" value={values.itemComponents[index].title}
                                                        onChange={handleChange}
                                                        onKeyDown={event=>{
                                                            if(event.key === 'Enter'){
                                                                event.preventDefault()
                                                                closeEditItemComponentButton.current.click()
                                                            }
                                                        }}
                                                    />
                                                    <input
                                                        name={`itemComponents[${index}].amount`}
                                                        type="number" min="1"
                                                        value={values.itemComponents[index].amount}
                                                        onChange={handleChange}
                                                        onKeyDown={event=>{
                                                            if(event.key === 'Enter'){
                                                                event.preventDefault()
                                                                closeEditItemComponentButton.current.click()
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                    :null
                                            }
                                            <span className="show-edit-element" onClick={_=>{
                                                let newShowEdit = [...showEdit]
                                                newShowEdit.forEach((val, i) => {
                                                    newShowEdit[i] = false
                                                    if(i === index){
                                                        newShowEdit[i] = true
                                                    }
                                                })
                                                setShowEdit(newShowEdit)
                                            }}>Edit</span>
                                            <span className="delete-element" onClick={_=>{
                                                let newShowEdit = [...showEdit]
                                                newShowEdit.splice(index, 1)
                                                values.itemComponents.splice(index,1)
                                                setShowEdit(newShowEdit)
                                            }}>X</span>
                                        </li>
                                    </Fragment>
                                )
                            })
                        }
                        {values.itemComponents.length===0?<li>No elements yet</li>:null}
                    </ul>
                }
                <input onKeyDown={event=>{
                    if(event.key === 'Enter'){
                        event.preventDefault()
                        addItemComponentButton.current.click()
                    }
                }} value={title} onChange={e=>setTitle(e.target.value)} type="text" name={"title"} placeholder={"title"}/>
                <input onKeyDown={event=>{
                    if(event.key === 'Enter'){
                        event.preventDefault()
                        addItemComponentButton.current.click()
                    }
                }} value={amount} onChange={e=>setAmount(e.target.value)} min={1} type="number" name={"amount"} placeholder={"amount"}/>
                <input ref={addItemComponentButton} type="button" value={"add component"} onClick={
                    ()=>addItemComponent({
                        title: title,
                        amount: amount
                    })
                } disabled={!title || !amount}/>
            </div>
    )
}
