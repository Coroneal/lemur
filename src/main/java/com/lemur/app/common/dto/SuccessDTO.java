package com.lemur.app.common.dto;

/**
 * DTO used only for question requests
 */
public class SuccessDTO {

    private boolean success;

    private String info;

    public SuccessDTO(boolean success, String info) {
        this.success = success;
        this.info = info;
    }

    public SuccessDTO(boolean success) {
        this(success, "");
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }


}
