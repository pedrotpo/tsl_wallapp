import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { css } from '@emotion/react'

export const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
  input:-webkit-autofill {
    -webkit-text-fill-color: #43a384 !important;
    -webkit-box-shadow: 0 0 0px 1000px #2b3e50 inset;
  }
`

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const colors = {
  brandblue: {
    500: '#2B3E50'
  },
  brandaqua: {
    500: '#43A384',
    600: '#357F66'
  },
  brandgreen: {
    500: '#5FCD72'
  },
  brandpurple: {
    500: '#8F4FAD',
    600: '#683A7F'
  },
  brandyellow: {
    500: '#EBC833',
    600: '#B29735'
  }
}

const fonts = {
  body: 'Roboto Mono',
  heading: 'Roboto Mono',
  mono: 'Menlo, monospace'
}

const Input = {
  parts: ['field', 'addon'],
  baseStyle: {
    field: {
      fontWeight: '700'
    }
  },
  variants: {
    outline: {
      field: {
        border: '2px solid',
        borderRadius: 'none',
        borderColor: 'brandaqua.500',
        color: 'brandaqua.500',
        _hover: {
          borderColor: 'brandaqua.500'
        },
        _focus: {
          borderColor: 'brandaqua.500',
          color: 'brandaqua.500'
        },
        _placeholder: {
          color: 'brandaqua.600'
        }
      }
    }
  },
  defaultProps: {
    variant: 'outline',
    focusBorderColor: 'none'
  }
}

const Textarea = {
  baseStyle: {
    fontWeight: '700'
  },
  variants: {
    outline: {
      border: '2px solid',
      borderRadius: 'none',
      borderColor: 'brandaqua.500',
      color: 'brandaqua.500',
      _hover: {
        borderColor: 'brandaqua.500'
      },
      _focus: {
        borderColor: 'brandaqua.500',
        color: 'brandaqua.500'
      },
      _placeholder: {
        color: 'brandaqua.600'
      }
    }
  },
  defaultProps: {
    variant: 'outline',
    focusBorderColor: 'none'
  }
}

const Button = {
  baseStyle: {
    fontWeight: '700',
    textTransform: 'uppercase',
    borderRadius: 'none'
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4,
      py: 3
    },
    md: {
      fontSize: 'md',
      px: 6,
      py: 4
    }
  },
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'brandpurple.500',
      color: 'brandaqua.500',
      _hover: {
        color: 'brandyellow.500',
        bg: 'transparent'
      },
      _active: {
        borderColor: 'brandpurple.600',
        color: 'brandyellow.600',
        bg: 'transparent'
      }
    },
    solid: {
      bg: 'brandaqua.500',
      color: 'brandblue.500',
      _hover: {
        color: 'brandyellow.500',
        bg: 'brandpurple.500'
      },
      _active: {
        color: 'brandyellow.600',
        bg: 'brandpurple.600'
      }
    },
    defaultProps: {
      size: 'md',
      variant: 'outline'
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'outline'
  }
}

const FormLabel = {
  baseStyle: {
    color: 'brandyellow.500',
    fontWeight: '700'
  }
}

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'brandblue.500',
        color: 'brandyellow.500'
      }
    }
  },
  config,
  colors,
  fonts,
  components: {
    Button,
    Input,
    FormLabel,
    Textarea
  }
})

export default customTheme
