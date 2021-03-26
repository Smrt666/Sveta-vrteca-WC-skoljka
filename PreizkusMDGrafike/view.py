try:
        import numpy as np
except ModuleNotFoundError:
        print("Naložiti je potrebno numpy. \n(python3 -m pip install numpy)\n(py -m pip installl numpy) - Windows")
        raise ModuleNotFoundError("Manjka numpy modul.")
try:
        from transrot import mover_and_rotator
except ModuleNotFoundError:
        from PreizkusMDGrafike.transrot import mover_and_rotator

class View:
        def __init__(self, dimensions):
                self.dimensions = dimensions
                self.pos = np.array([[0] for _ in range(dimensions)])
                
                # x -> y, x -> z, x -> w, ...
                self.rot = np.array([0]*(dimensions-1))
        
        
        def __str__(self):
                pos, rotmat = mover_and_rotator(self)
                vels = 100 * np.linalg.inv(rotmat)
                pos = f'Position: {[int(i[0]) for i in self.pos]}\n'
                direction = f'Direction: {[i for i in self.rot]}\nFrom x to other axes in degrees.\n\n'
                parvs = f'Partial velocities: {[int(i[0]) for i in vels]}\n'
                parvs_description = 'In percent, if you move in current direction,\nn-th coordinate wil change for distance\nmultiplied by the n-th percent\n'
                return pos + direction + parvs + parvs_description

        def move(self, vector):
                self.pos = self.pos + vector
        
        def rotate(self, vector):
                self.rot = np.array([(self.rot[i] + vector[i])%360 for i in range(len(vector))])
