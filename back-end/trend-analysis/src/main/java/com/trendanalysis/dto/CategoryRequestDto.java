package com.trendanalysis.dto;

import com.trendanalysis.entity.Keyword;
import lombok.Data;

import java.util.List;

@Data
public class CategoryRequestDto {

    private String name;
    private List<String> keywordNames;
    private String parentId;
}