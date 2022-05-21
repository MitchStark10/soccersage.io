import EditPredictionCell from 'src/components/Prediction/EditPredictionCell'

type PredictionPageProps = {
  id: number
}

const EditPredictionPage = ({ id }: PredictionPageProps) => {
  return <EditPredictionCell id={id} />
}

export default EditPredictionPage
