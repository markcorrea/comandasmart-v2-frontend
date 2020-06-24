const useYupValidationResolver = validationSchema => async (data, validationContext) => {
  try {
    const values = await validationSchema.validate(data, {
      abortEarly: false,
      context: validationContext,
    })
    return {
      values,
      errors: {},
    }
  } catch (errors) {
    const result = {
      values: {},
      errors: errors.inner.reduce(
        (allErrors, currentError) => ({
          ...allErrors,
          [currentError.path]: {
            type: currentError.type || 'validation',
            message: currentError.message,
            path: [currentError.path],
          },
        }),
        {}
      ),
    }
    return result
  }
}

export default useYupValidationResolver
