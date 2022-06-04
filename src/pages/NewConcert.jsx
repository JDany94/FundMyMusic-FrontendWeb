import FormConcert from "../components/FormConcert"

const NewConcert = () => {
    return (
      <>
          <h1 className="text-4xl font-black text-center">Publicar nuevo concierto</h1>
          <div className="mt-10 flex justify-center">
              <FormConcert />
          </div>
      </>
    )
  }
  
  export default NewConcert