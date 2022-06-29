import SeasonCell from 'src/components/Season/SeasonCell'

type SeasonPageProps = {
  id: number
}

const SeasonPage = ({ id }: SeasonPageProps) => {
  return <SeasonCell id={id} />
}

export default SeasonPage
