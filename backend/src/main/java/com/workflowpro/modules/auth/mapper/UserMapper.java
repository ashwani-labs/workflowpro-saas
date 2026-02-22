package com.workflowpro.modules.auth.mapper;

import com.workflowpro.modules.auth.dto.RegisterRequest;
import com.workflowpro.modules.auth.dto.AuthResponse;
import com.workflowpro.modules.auth.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "organization", ignore = true)
    @Mapping(target = "assignedTasks", ignore = true)
    @Mapping(target = "role", constant = "USER")
    User toEntity(RegisterRequest registerRequest);

    @Mapping(target = "token", source = "token")
    AuthResponse toResponse(User user, String token);
}
