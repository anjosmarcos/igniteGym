import { Input as NativeNaseInput, IInputProps, FormControl } from 'native-base'

type Props = IInputProps & {
    errorMessage?: string | null
}

export function Input({ errorMessage = null,isInvalid,  ...rest }: Props) {
    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl isInvalid={invalid} mb={4}>
            <NativeNaseInput
                bg='gray.700'
                h={14}
                px={4}
                borderWidth={0}
                fontSize="md"
                color='white'
                fontFamily='body'

                placeholderTextColor='gray.300'
                _focus={{
                    bg: 'gray.700',
                    borderColor: 'green.500',
                    borderWidth: 1
                }}
                {...rest}
            />
            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}