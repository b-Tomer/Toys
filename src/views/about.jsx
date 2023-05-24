import GoogleMap from "../cmps/google-map";

export function About() {
    return <section className="about">
        <h1 style={{ marginLeft: "45%", padding: "20px" }}>Our Branches:</h1>
        <section style={{ height: '400px', margin: 'auto', width: '800px' }}>
            <GoogleMap />
        </section>
    </section>
}
