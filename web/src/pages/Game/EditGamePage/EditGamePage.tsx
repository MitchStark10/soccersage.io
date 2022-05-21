import EditGameCell from 'src/components/Game/EditGameCell'

type GamePageProps = {
  id: number
}

const EditGamePage = ({ id }: GamePageProps) => {
  return <EditGameCell id={id} />
}

export default EditGamePage
