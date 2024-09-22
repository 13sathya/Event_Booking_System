import React from 'react'

function Error({msg}) {
  return (
    <div>
      <div class="alert alert-danger" role="alert">
      {msg}
</div>
    </div>
  )
}

export default Error
