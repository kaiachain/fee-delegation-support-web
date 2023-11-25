import { ReactElement } from 'react'
import styled from 'styled-components'

import { STYLE } from 'consts'

const StyledFile = styled.input`
  color: ${STYLE.getTheme('gray', '_400')};
`

type FormFileProps = {
  accept: string
  onChange: (accept?: FileList) => void
  placeholder?: string
}

const FormFile = ({
  accept,
  placeholder,
  onChange,
}: FormFileProps): ReactElement => (
  <StyledFile
    className="form-control"
    type="file"
    accept={accept}
    onChange={(e): void => onChange(e.target.files || undefined)}
    placeholder={placeholder}
  />
)

export default FormFile
