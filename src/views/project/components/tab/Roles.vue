<script lang="ts" src="./Roles.script"></script>

<style lang="scss" src="./Roles.scss"></style>

<template>
    <div class="project-roles-header mb-2">
        <h5 class="mb-0"></h5>
        <Button label="Assign Roles" icon="ri-user-add-line" class="p-button-primary p-button-sm" @click="onAssignRoles" />
    </div>

    <div class="table-wrapper mt-3">
        <table class="table role-table mb-0 mt-2" v-if="masterProjectRoles.length > 0">
            <tbody>
                <tr v-for="index in Math.ceil(masterProjectRoles.length / 2)" :key="index">
                    <!-- Left Role -->
                    <td class="role-name">
                        {{ masterProjectRoles[(index - 1) * 2]?.name || '' }}
                        <i v-if="masterProjectRoles[(index - 1) * 2]?.name && !masterProjectRoles[(index - 1) * 2]?.members?.length" class="ri-alert-line text-danger" style="font-size: 18px"></i>
                    </td>

                    <td class="role-members">
                        <div class="members-container">
                            <div class="members-list">
                                <ul class="list-none p-0 m-0">
                                    <li v-for="(user, userIndex) in masterProjectRoles[(index - 1) * 2]?.members?.slice(0, 4) || []" :key="userIndex" class="flex align-items-center mb-2">
                                        <span class="text-muted mr-2 mt-1">{{ userIndex + 1 }}.</span>
                                        <div class="flex align-items-center">
                                            <Avatar :label="getInitials(user.name)" shape="circle" style="background: #e0f2fe; color: #2563eb; width: 30px; height: 30px" />
                                            <span class="ml-2 mt-1">{{ user.name }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="view-more-wrapper" v-if="(masterProjectRoles[(index - 1) * 2]?.members?.length || 0) > 4">
                                <small class="text-primary view-more" @click="viewMore(masterProjectRoles[(index - 1) * 2]?.id)">
                                    <i class="ri-arrow-right-line align-middle me-1"></i>
                                    View
                                    {{ (masterProjectRoles[(index - 1) * 2]?.members?.length || 0) - 4 }}
                                    More
                                </small>
                            </div>
                        </div>
                    </td>

                    <!-- Right Role -->
                    <td class="role-name">
                        {{ masterProjectRoles[(index - 1) * 2 + 1]?.name || '' }}
                        <i v-if="masterProjectRoles[(index - 1) * 2 + 1]?.name && !masterProjectRoles[(index - 1) * 2 + 1]?.members?.length" class="ri-alert-line text-danger" style="font-size: 18px"></i>
                    </td>

                    <td class="role-members">
                        <div class="members-container">
                            <div class="members-list">
                                <ul class="list-none p-0 m-0">
                                    <li v-for="(user, userIndex) in masterProjectRoles[(index - 1) * 2 + 1]?.members?.slice(0, 4) || []" :key="userIndex" class="flex align-items-center mb-2">
                                        <span class="text-muted mr-2 mt-1">{{ userIndex + 1 }}.</span>
                                        <div class="flex align-items-center">
                                            <Avatar :label="getInitials(user.name)" shape="circle" style="background: #e0f2fe; color: #2563eb; width: 30px; height: 30px" />
                                            <span class="ml-2 mt-1">{{ user.name }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="view-more-wrapper" v-if="(masterProjectRoles[(index - 1) * 2 + 1]?.members?.length || 0) > 4">
                                <small class="text-primary view-more" @click="viewMore(masterProjectRoles[(index - 1) * 2 + 1]?.id)">
                                    <i class="ri-arrow-right-line align-middle me-1"></i>
                                    View
                                    {{ (masterProjectRoles[(index - 1) * 2 + 1]?.members?.length || 0) - 4 }}
                                    More
                                </small>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <ProjectRoles v-if="showProjectRolesModal" :visible="showProjectRolesModal" @close="closeModal" />
</template>
