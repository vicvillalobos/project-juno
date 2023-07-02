<template>
    <nav id="sidebar__menu">
        <ul>
            <li>
                <router-link to="/dashboard" title="Dashboard">
                    <el-icon>
                        <House />
                    </el-icon>
                </router-link>
            </li>
            <li>
                <router-link to="/accounting" title="Balance">
                    <el-icon>
                        <Notebook />
                    </el-icon>
                </router-link>
            </li>
            <li>

                <router-link to="/about" title="Acerca de...">
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss">
#sidebar__menu {
    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            margin: 0;
            padding: 0;

            a {
                display: block;
                color: #607d8b;
                text-decoration: none;
                font-size: 28px;
                width: 100%;
                text-align: center;
                height: 60px;
                line-height: 65px;

                transition: all 0.2s ease-in-out;

                &:hover {
                    color: #fff;
                }

                &.router-link-active {
                    position: relative;
                    color: #fff;

                    &::after {
                        content: "";
                        display: block;
                        width: 3px;
                        height: 60px;
                        background-color: #ff6600;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                }
            }
        }
    }
}
</style>