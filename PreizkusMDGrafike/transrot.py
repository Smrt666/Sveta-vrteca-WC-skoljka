import numpy as np

def mover_and_rotator(view):
        rot_matrix = np.identity(view.dimensions)
        for second_axis in range(1, view.dimensions):
                sin = np.sin(view.rot[second_axis-1]*np.pi/180)
                cos = np.cos(view.rot[second_axis-1]*np.pi/180)
                r = []
                for j in range(view.dimensions):
                        line = [0]*view.dimensions
                        for i in range(view.dimensions):
                                if i == j == 0:
                                        # zgornji levi kot vedno cos,
                                        # ker so vse rotacije relativne na x os 
                                        line[i] = cos
                                elif i == 0 and second_axis == j:
                                        # levi spodnji sin
                                        line[i] = sin
                                elif i == second_axis and j == 0:
                                        # desni zgornji -sin
                                        line[i] = -sin
                                elif i == second_axis and j == second_axis:
                                        # desni spodnji cos
                                        line[i] = cos
                                elif i == j:
                                        # Po diagonali morajo biti 1,
                                        # razen tam, kjer so že vrednosti kotnih funkcij
                                        line[i] = 1
                        r.append(line)
                # r mora zgledati nekako takole:
                # cos 0 0 0 -sin ...
                #  0  1 0 0  0   ...
                #  0  0 1 0  0   ...
                #  0  0 0 1  0   ...
                # sin 0 0 0 cos  ...
                #  .        . 1  0..
                #  .        .   ...
                rot_matrix = np.array(r, dtype=np.float32) @ rot_matrix
        
        return (view.pos, rot_matrix)
