package com.workflowpro.common.dto;

import lombok.Data;

import java.util.List;

/**
 * Generic pagination response wrapper.
 * Provides consistent structure for paginated responses.
 */
@Data
public class PageResponse<T> {

    /**
     * List of items in the current page.
     */
    private List<T> content;

    /**
     * Current page number (0-based).
     */
    private int page;

    /**
     * Number of items per page.
     */
    private int size;

    /**
     * Total number of items available.
     */
    private long totalElements;

    /**
     * Total number of pages available.
     */
    private int totalPages;

    /**
     * Whether this is the first page.
     */
    private boolean first;

    /**
     * Whether this is the last page.
     */
    private boolean last;

    /**
     * Whether there is a next page.
     */
    private boolean hasNext;

    /**
     * Whether there is a previous page.
     */
    private boolean hasPrevious;
}
