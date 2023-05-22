
export function PopupMenu({ children, title }) {

    return (
        <section className="popup-menu">
            

            <section className="title">
                {title}
            </section>
            {children}
        </section>
    )
}
