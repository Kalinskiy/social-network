import React, {ChangeEvent, ReactChildren} from "react";
import style from "./Modal.module.scss"

type ModalAddPackType = {
    modalActive: boolean
    setModalActive: (active: boolean) => void
    children: ReactChildren
    onCancel: ()=>void
    onClick: ()=>void
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    withoutInput?: boolean
}

type ModalCardType = {
    modalActive: boolean
    setModalActive: (active: boolean) => void
    children: ReactChildren
    onCancel: ()=>void
    onClick: ()=>void
}

type ModalWithChildrenType = {
    modalActive: boolean
    setModalActive: (active: boolean) => void
    children: ReactChildren
    onCancel: ()=>void
}

export const ModalInput = (props: ModalAddPackType) => {

    return <div className={props.modalActive ? `${style.modal} ${style.active}` : style.modal}
                onClick={props.onCancel}>
        <div className={props.modalActive ? `${style.modalContent} ${style.active} ` : style.modalContent}
             onClick={e => e.stopPropagation()}>
            {props.children}
            <input
                value={props.value}
                onChange={props.onChange}
                type="text"
            />
            <br/>
            <button onClick={props.onClick}>Submit</button>
            <button onClick={props.onCancel}>Cancel</button>


        </div>

    </div>

}
export const Modal = (props: ModalCardType) => {

    return <div className={props.modalActive ? `${style.modal} ${style.active}` : style.modal}
                onClick={props.onCancel}>
        <div className={props.modalActive ? `${style.modalContent} ${style.active} ` : style.modalContent}
             onClick={e => e.stopPropagation()}>
            {props.children}
            <br/>
            <button onClick={props.onClick}>Submit</button>
            <button onClick={props.onCancel}>Cancel</button>
        </div>

    </div>
}
export const ModalWithChildren = (props: ModalWithChildrenType) => {

    return <div className={props.modalActive ? `${style.modal} ${style.active}` : style.modal}
                onClick={props.onCancel}>
        <div className={props.modalActive ? `${style.modalContent} ${style.active} ` : style.modalContent}
             onClick={e => e.stopPropagation()}>
            {props.children}

        </div>

    </div>
}
