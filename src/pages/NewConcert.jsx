import FormConcert from "../components/FormConcert"

const NewConcert = () => {
    return (
      <>
          <h1 className="pt-8 pb-3 text-white font-bold text-3xl uppercase text-center">Publicar nuevo concierto</h1>
          <div className="mt-5 flex justify-center">
              <FormConcert />
          </div>
      </>
    )
  }
  
  export default NewConcert