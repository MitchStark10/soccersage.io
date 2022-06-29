import EditSeasonCell from 'src/components/Season/EditSeasonCell'

type SeasonPageProps = {
  id: number
}

const EditSeasonPage = ({ id }: SeasonPageProps) => {
  return <EditSeasonCell id={id} />
}

export default EditSeasonPage
