const Course = ({courseName, courseParts}) => {
    return (
      <>
        <Header courseName={courseName} />
        <Content courseParts={courseParts} />
        <Total total={courseParts.reduce((accumulator, part) => accumulator + part.exercises, 0)} />
      </>
    )
  }
  
  const Header = ({courseName}) => {
    return (
      <>
        <h1>{courseName}</h1>
      </>
    )
  }
  
  const Content = ({courseParts}) => {
    return (
      <>
        {courseParts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </>
    )
  }
  
  const Part = ({name, exercises}) => {
    return (
      <>
        <p>{name} {exercises}</p>
      </>
    )
  }
  
  const Total = ({total}) => {
    return (
      <>
        <p>Total of exercises {total}</p>
      </>
    )
  }

  export default Course