import PredictionCell from 'src/components/Prediction/PredictionCell'

type PredictionPageProps = {
  id: number
}

const PredictionPage = ({ id }: PredictionPageProps) => {
  return <PredictionCell id={id} />
}

export default PredictionPage
