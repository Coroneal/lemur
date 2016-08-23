package com.lemur.app.common.serialization;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lemur.app.common.serialization.CustomTimeDeserializer;

/**
 * Custom exception thrown when it was not possible to deserialize a time field,
 * @see CustomTimeDeserializer
 */
public class TimeDeserializationException extends JsonProcessingException {

    protected TimeDeserializationException(Throwable rootCause) {
        super(rootCause);
    }

}
